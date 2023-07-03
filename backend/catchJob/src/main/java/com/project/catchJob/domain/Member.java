package com.project.catchJob.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;



@Table(name = "member")
@Entity
public class Member {

	@Id
	@GeneratedValue
	@Column(name = "member_id")
	private Long memberId; // email �� �� �ĺ��Ϸ��� ���� ���̵�
	
	private String name;
	
	private String email;
	
	private String pwd;
	
	private String job; // ����
	
	private boolean hasCareer; // ��¿���(f=����/t=���)


}
