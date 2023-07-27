package com.project.catchJob.repository.member;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.catchJob.domain.member.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {

	Boolean existsByEmail(String email);
	Member findByEmail(String email);
	Optional<Member> findOptionalByEmail(String email);
}
